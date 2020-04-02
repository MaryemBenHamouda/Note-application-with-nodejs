const fs = require("fs");

Help = () => {
  console.log("add \t\t\t To add new todo");
  console.log("remove \t\t\t To remove a todo");
  console.log("list \t\t\t To list all todos");
  console.log("add \t\t\t To display a todo");
};

Add = () => {
  let newtodo = {};
  let titleIndex = process.argv.findIndex(el => el === "--title");
  if (titleIndex === -1 || process.argv[titleIndex + 1] === undefined) {
    console.log("Option:");
    console.log("--title\t\t\t Title of note ");
    console.log("--body\t\t\t Body of note\n");
    console.log("\n Missing required Arguments:--title --body");
  } else {
    newtodo.Title = process.argv[titleIndex + 1];
  }
  let bodyIndex = process.argv.findIndex(el => el === "--body");
  if (bodyIndex === -1 || process.argv[bodyIndex + 1] === undefined) {
    console.log("Option:");
    console.log("--title\t\t\t Title of note ");
    console.log("--body\t\t\t Body of note\n");
    console.log("\n Missing required Arguments:--title --body");
    return;
  } else {
    newtodo.Body = process.argv[bodyIndex + 1];
  }
  let todoJason = fs.readFileSync("./todos.json", "utf8");
  let todo = JSON.stringify(JSON.parse(todoJason).concat(newtodo));

  fs.writeFileSync("todos.json", todo);
  console.log("note Created!");
  console.log(`Title: ${newtodo.Title}`);
  console.log(`Body: ${newtodo.Body}`);
  return;
};
Remove = () => {
  let titleIndex = process.argv.findIndex(el => el === "--title");
  if (titleIndex === -1 || process.argv[titleIndex + 1 === undefined]) {
    console.log("Option:");
    console.log("--title\t\t\t Title of note ");
    console.log("--help\t\t\t to show help\n");
    console.log("\n Missing required Arguments:--title ");
  } else {
    let todo = fs.readFileSync("./todos.json", "utf8");
    let tab = JSON.parse(todo);
    let filtertodo = tab.filter(
      el => el.Title !== process.argv[titleIndex + 1]
    );
    if (filtertodo.length === tab.length) {
      console.log("title not exist");
      return;
    }

    fs.writeFileSync("todos.json", JSON.stringify(filtertodo));
    console.log("note was removed!");
  }
};

List = () => {
  let tab = JSON.parse(fs.readFileSync("todos.json", "utf8"));
  console.log(`Priting ${tab.length} not(s)`);
  console.log("--------");
  tab.forEach(el => {
    console.log(`Title: ${el.Title}`);
    console.log(`Body: ${el.Body}\n`);
  });
};

Read = () => {
  let titleIndex = process.argv.findIndex(el => el === "--title");
  if (titleIndex === -1 || process.argv[titleIndex + 1 === undefined]) {
    console.log("Option:");
    console.log("--title\t\t\t Title of note ");
    console.log("--help\t\t\t to show help\n");
    console.log("\n Missing required Arguments:--title ");
  } else {
    let tab = JSON.parse(fs.readFileSync("todos.json", "utf8"));
    let todo = tab.find(el => el.Title === process.argv[titleIndex + 1]);
    if (todo) {
      console.log("node found");
      console.log(`Title:${todo.Title}`);
      console.log(`Body:${todo.Body}`);
    } else console.log("note not found!");
  }
};

switch (process.argv[2]) {
  case "help":
    return Help();
    break;
  case "add":
    return Add();
    break;
  case "remove":
    return Remove();
    break;
  case "list":
    return List();
    break;
  case "read":
    return Read();
    break;
  default:
    return Help();
}
