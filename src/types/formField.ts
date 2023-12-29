enum FieldName {
  HEADER = 'header',
  SHORT_TEXT = 'shortText',
  LONG_TEXT = 'longText',
  MAIL_ADRESS = 'mailAdress',
  PHONE = 'phone',
  TEXT = 'text',
}

type HeaderType = {
  title: string;
};

type LongTextType = {
  text: string;
};

type shortTextType = {
  text: string;
};

type SimpleQuestion = {
  id: string
  text: string;
  answer: string;
};

type RadioQuestion = {
  text: string;
  questions: string[];
  answer: string;
};
