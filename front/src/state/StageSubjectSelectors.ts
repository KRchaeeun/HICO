import { selector } from 'recoil'
import { stageSubjectState } from './StageSubjectAtoms'
import { book } from '@/api/child';

// 미국
export const selectedUsaStageInfo = selector({
  key: 'selectedUsaStageInfo',
  get: async ({ get }) => {
    const stageId = get(stageSubjectState);
    const response = await book(stageId);

    // 현재 선택된 스테이지의 인덱스
    const selectedUsaStageIndex = response.data.data.stageId;

    // 선택된 스테이지의 주제
    const selectedTopic = response.data.data.stageTitle;

    // 선택된 스테이지 번호와 주제 반환
    return {
      stageNum: selectedUsaStageIndex,
      topic: selectedTopic,
    }
  },
})

// 이탈리아
export const selectedItalyStageInfo = selector({
  key: 'selectedItalyStageInfo',
  get: async ({ get }) => {
    const stageId = get(stageSubjectState) + 10
    const response = await book(stageId);

    // 현재 선택된 스테이지의 인덱스
    const selectedItalyStageIndex = get(stageSubjectState)

    // 선택된 스테이지의 주제
    const selectedTopic = response.data.data.stageTitle;

    // 선택된 스테이지 번호와 주제 반환
    return {
      stageNum: selectedItalyStageIndex,
      topic: selectedTopic,
    }
  },
})

export const selectedJapanStageInfo = selector({
  key: 'selectedJapanStageInfo',
  get: async ({ get }) => {
    const stageId = get(stageSubjectState) + 5
    const response = await book(stageId);

    // 현재 선택된 스테이지의 인덱스
    const selectedJapanStageIndex = get(stageSubjectState)

    // 선택된 스테이지의 주제
    const selectedTopic = response.data.data.stageTitle;

    // 선택된 스테이지 번호와 주제 반환
    return {
      stageNum: selectedJapanStageIndex,
      topic: selectedTopic,
    }
  },
})

export const selectedChinaStageInfo = selector({
  key: 'selectedChinaStageInfo',
  get: async ({ get }) => {
    const stageId = get(stageSubjectState) + 15
    const response = await book(stageId);

    // 현재 선택된 스테이지의 인덱스
    const selectedChinaStageIndex = get(stageSubjectState)

    // 선택된 스테이지의 주제
    const selectedTopic = response.data.data.stageTitle;

    // 선택된 스테이지 번호와 주제 반환
    return {
      stageNum: selectedChinaStageIndex,
      topic: selectedTopic,
    }
  },
})