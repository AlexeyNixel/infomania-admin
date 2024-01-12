enum FieldName {
  HEADER = 'header',
  SHORT_TEXT = 'shortText',
  LONG_TEXT = 'longText',
  MAIL_ADRESS = 'mailAdress',
  PHONE = 'phone',
  TEXT = 'text',
}

export type HeaderType = {
  title: string;
};

export type LongTextType = {
  text: string;
};

export type shortTextType = {
  text: string;
};

export type SimpleQuestion = {
  id: string
  text: string;
  answer: string;
};

export type RadioQuestion = {
  text: string;
  questions: string[];
  answer: string;
};
