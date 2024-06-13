import React, { useState, useEffect } from 'react';

const Tts: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);

    useEffect(() => {
        function setVoiceList() {
            // 한국어 음성만 필터링
            const filteredVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('ko'));
            setVoices(filteredVoices);

            // 기본 선택된 음성 설정 (필터링된 목록의 첫 번째 음성)
            if(filteredVoices.length > 0) {
                const defaultVoiceIndex = speechSynthesis.getVoices().indexOf(filteredVoices[0]);
                setSelectedVoiceIndex(defaultVoiceIndex);
            }
        }

        setVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = setVoiceList;
        }
    }, []);

    const handleSpeak = () => {
        if(voices.length === 0) return; // 음성 목록이 비어있으면 실행하지 않음

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[selectedVoiceIndex];
        speechSynthesis.speak(utterance);
    };

    return (
        <div>
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="듣고 싶은 텍스트를 입력하세요"
      />
            <select
                onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value, 10))}
                value={selectedVoiceIndex}
            >
                {voices.map((voice, index) => (
                    <option key={voice.voiceURI} value={index}>
                        {voice.name} ({voice.lang})
                    </option>
                ))}
            </select>
            <button onClick={handleSpeak}>Listen</button>
        </div>
    );
};

export default Tts;
