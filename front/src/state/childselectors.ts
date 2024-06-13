import { selector } from "recoil";
import { stageSubjectState, countrydetailState } from "./StageSubjectAtoms";
import { book, quiz } from "@/api/child";

export const bookList = selector({
    key: "bookList",
    get: async({ get }) => {
        const stageId = get(stageSubjectState);
        const countryId = get(countrydetailState);
        const response = await book(stageId + (countryId - 1) * 5);
        const bookList = response.data.data.pageList;
        bookList.push(bookList[4]);
        return bookList;
    }
})

export const quizList = selector({
    key: "quizList",
    get: async({ get }) => {
        const stageId = get(stageSubjectState);
        const countryId = get(countrydetailState);
        const response = await quiz(stageId + (countryId - 1) * 5);
        const increase = response.data.data.increase;
        const quizDataList = response.data.data.quizList;
        quizDataList.push({ quizId: 0, quizQuestion: "", quizAnswer: "", quizType: "", quizLevel: "", quizPrice: 0, isCorrect: false });
        return {
            increase,
            quizDataList,
        };
    }
})