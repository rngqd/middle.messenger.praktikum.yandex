import Block from "./Block";

export default function renderDOM(selector: string, block: Block) {
  const root = document.querySelector(`${selector}`);
  if (!root) {
    return;
  }

  root!.innerHTML = "";
  root!.appendChild(block.getContent());
}
