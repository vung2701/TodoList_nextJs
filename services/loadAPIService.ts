import { debounce } from "lodash";
import { createTodo, deleteTodo, updateTodo } from "./todoService";
import Todo, { CompletionStatus } from "@/types/todoType";

// Add
const runStoreAdd = debounce(async (storedAddArr: string[] = []): Promise<void> => {
  if (!storedAddArr.length) return;
  for (const str of storedAddArr) {
    await createTodo(str);
  }
  storedAddArr = [];
}, 1000);

export function storeAddItem(storedAddArr: string[] = [], name: string): void {
  storedAddArr.push(name);
  runStoreAdd(storedAddArr);
}

// Delete
const runStoreDel = debounce(async (storedDelArr: number[] = []): Promise<void> => {
  if (!storedDelArr.length) return;

  let uniqueStoredDelArr = storedDelArr.filter(
    (value: number, index: number) => storedDelArr.indexOf(value) === index
  );
  for (const id of uniqueStoredDelArr) {
    await deleteTodo(id);
  }
  storedDelArr = [];
  uniqueStoredDelArr = [];
}, 1000);

export function storeDelItem(storedDelArr: number[] = [],id: number): void {
  storedDelArr.push(id);
  console.log("del");
  runStoreDel(storedDelArr);
}

// Update


const runStoreUpdate = debounce(async (storedUpdateArr: Todo[] = []): Promise<void> => {
  if (!storedUpdateArr.length) return;
  for (const obj of storedUpdateArr) {
    console.log(obj)
    await updateTodo(obj);
  }
  storedUpdateArr = [];
}, 1000);

export function storeUpdateItem(storedUpdateArr: Todo[] = [],newTodo : Todo): void {
  storedUpdateArr.push(newTodo);
  runStoreUpdate(storedUpdateArr);
}


