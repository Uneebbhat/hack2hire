export type HandleOnChange =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | {
      target: {
        name: string;
        value: string;
      };
    };

export type HandleOnFileChange = React.ChangeEvent<HTMLInputElement>;

export type HandleOnSubmit = React.FormEvent<HTMLFormElement>;
