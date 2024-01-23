import { writable } from "svelte/store";
import { cleanName } from "$lib/utils";

type SearchStore = {
  data: string[];
  filtered: string[];
  search: string;
};

export function createSearchStore(data: string[]) {
  // filter bus stop objects based on name
  const { subscribe, set, update } = writable({
    data: data,
    filtered: data,
    search: "",
  });

  return {
    subscribe,
    set,
    update,
  };
}

export function searchHandler(store: SearchStore) {
  const searchTerm = store.search.toLowerCase();
  store.filtered = store.data.filter((item) => {
    return item.toLowerCase().includes(searchTerm) || cleanName(item.toLocaleLowerCase()).includes(searchTerm);
  });
}
