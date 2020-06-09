const HomePageData = [
  {
    role: "QM",
    cards: [
      {
        id: "1",
        title: "CATEGORY",
        buttons: [
          { title: "Create New Category", path: "", id: "1a" },
          { title: "Edit Existing Category", path: "", id: "1b" },
        ],
      },
      {
        id: "2",
        title: "PROBLEM SET",
        buttons: [
          { title: "Create New Set", path: "", id: "2a" },
          { title: "Edit Existing Set", path: "", id: "2b" },
        ],
      },
      {
        id: "3",
        title: "PROBLEM",
        buttons: [
          { title: "Create New Problem", path: "/problem/add", id: "3a" },
          { title: "Edit Existing Problem", path: "", id: "3b" },
        ],
      },
      {
        id: "4",
        title: "QUIZ TEMPLATE",
        buttons: [
          {
            title: "Create New Template",
            path: "/quiz-template/add",
            id: "4a",
          },
          {
            title: "Edit Existing Template",
            path: "",
            id: "4b",
          },
        ],
      },
    ],
  },
  {
    role: "HR",
    cards: [
      {
        id: "5",
        title: "CREATE QUIZ",
        buttons: [
          { title: "Create New Quiz", path: "", id: "5a" },
          { title: "Delete Existing Quiz", path: "", id: "5b" },
        ],
      },
      {
        id: "6",
        title: "QUIZ RESULTS",
        buttons: [{ title: "View Results", path: "", id: "6a" }],
      },
    ],
  },
  {
    role: "ASSESSOR",
    cards: [
      {
        id: "7",
        title: "RESULTS",
        buttons: [{ title: "View Results", path: "", id: "7a" }],
      },
    ],
  },
  {
    role: "ADMIN",
    cards: [],
  },
];

export default HomePageData;
