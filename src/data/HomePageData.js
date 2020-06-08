const HomePageData = [
  {
    role: "QM",
    cards: [
      {
        title: "CATEGORY",
        buttons: [
          { title: "Create New Category", path: "" },
          { title: "Edit Existing Category", path: "" },
        ],
      },
      {
        title: "PROBLEM SET",
        buttons: [
          { title: "Create New Set", path: "" },
          { title: "Edit Existing Set", path: "" },
        ],
      },
      {
        title: "PROBLEM",
        buttons: [
          { title: "Create New Problem", path: "/problem/add" },
          { title: "Edit Existing Problem", path: "" },
        ],
      },
      {
        title: "QUIZ TEMPLATE",
        buttons: [
          { title: "Create New Template", path: "/quiz-template/add" },
<<<<<<< HEAD
          {
            title: "Edit Existing Template",
            path: "",
          },
=======
          { title: "Edit Existing Template", path: "" },
>>>>>>> [charles/chengyuan] #16 added QuizTemplate and QuizTemplateCongfirmation
        ],
      },
    ],
  },
  {
    role: "HR",
    cards: [
      {
        title: "CREATE QUIZ",
        buttons: [
          { title: "Create New Quiz", path: "" },
          { title: "Delete Existing Quiz", path: "" },
        ],
      },
      {
        title: "QUIZ RESULTS",
        buttons: [{ title: "View Results", path: "" }],
      },
    ],
  },
  {
    role: "ASSESSOR",
    cards: [
      {
        title: "RESULTS",
        buttons: [{ title: "View Results", path: "" }],
      },
    ],
  },
  {
    role: "ADMIN",
    cards: [],
  },
];

export default HomePageData;
