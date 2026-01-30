type Option = { id: string; label: string };

export type QuestionData =
  | {
      id: string;
      uiType: 'basicInfo';
      title?: string;
      description?: string;
    }
  | {
      id: string;
      uiType: 'categorySelect';
      title: string;
      description?: string;
      options: Option[];
      maxSelect: number;
    }
  | {
      id: string;
      uiType: 'multiChoice';
      title: string;
      description?: string;
      options: Option[];
      maxSelect?: number;
    }
  | {
      id: string;
      uiType: 'scaleChoice';
      title: string;
      description?: string;
      /** 5개 선택지  */
      scaleChoices?: [string, string, string, string, string];
    };
