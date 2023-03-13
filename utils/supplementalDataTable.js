const translate = {
  birthday: {
    desc: "Datum narození",
    input: "date",
  },
  birthId: {
    desc: "Vyplňte rodné číslo",
    input: "number",
  },
  household: {
    desc: "Počet členů domácnosti",
    input: "number",
  },
  nationality: {
    desc: "Národnost",
    input: "text",
  },
  employment: {
    desc: "Zaměstnání",
    input: "text",
  },
  education: {
    desc: "Dosažené vzdělání",
    input: "select",
    options: [
      {
        desc: "Bez vzdělání",
        value: 0,
      },
      {
        desc: "Základní",
        value: 1,
      },
      {
        desc: "Střední",
        value: 2,
      },
      {
        desc: "Vyšší odborné",
        value: 3,
      },
      {
        desc: "Vysokoškolské - bakalář",
        value: 4,
      },
      {
        desc: "Vysokoškolské - magistr",
        value: 5,
      },
      {
        desc: "Vysokoškolské - doktorát",
        value: 6,
      },
    ],
  },
  smoker: {
    desc: "Kuřák",
    input: "select",
    options: [
      {
        desc: "Ano",
        value: 1,
      },
      {
        desc: "Ne",
        value: 0,
      },
    ],
  },
  animals: {
    desc: "Domácí zvířata",
    input: "select",
    options: [
      {
        desc: "Ano",
        value: 1,
      },
      {
        desc: "Ne",
        value: 0,
      },
    ],
  },
  comment: {
    desc: "Komentář (30 znaků)",
    input: "text",
  },
};

export default translate;
