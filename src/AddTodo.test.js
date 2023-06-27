import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByLabelText('Due Date');
  const add = screen.getByTestId('new-item-button');
  fireEvent.change(inputTask, {target: {value: "Task1"}});
  fireEvent.change(inputDate, {target: {value: "05/30/2023"}});
  fireEvent.click(add);

  fireEvent.change(inputTask, {target: {value: "Task1"}});
  fireEvent.change(inputDate, {target: {value: "06/01/2023"}});
  fireEvent.click(add);

  const check = screen.queryByText("6/1/2023");

  expect(check).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByLabelText('Due Date');
  const add = screen.getByTestId('new-item-button');
  fireEvent.change(inputTask, {target: {value: ""}});
  fireEvent.change(inputDate, {target: {value: "05/30/2023"}});
  fireEvent.click(add);

  const check = screen.queryByText("5/30/2023");

  expect(check).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByLabelText('Due Date');
  const add = screen.getByTestId('new-item-button');

  fireEvent.change(inputTask, {target: {value: "Task1"}});
  fireEvent.change(inputDate, {target: {value: ""}});
  fireEvent.click(add);

  const check = screen.queryByText("Task1");

  expect(check).not.toBeInTheDocument();
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByLabelText('Due Date');
  const add = screen.getByTestId('new-item-button');

  fireEvent.change(inputTask, {target: {value: "Task1"}});
  fireEvent.change(inputDate, {target: {value: "05/30/2023"}});
  fireEvent.click(add);

  const deleteBox = screen.getByRole('checkbox');
  fireEvent.click(deleteBox);

  const check = screen.queryByText("Task1");

  expect(check).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const demoDate = new Date();
  demoDate.setDate(demoDate.getDate() - 1);
  const formattedDate = demoDate.toLocaleDateString();

  const content = "Task1";
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByLabelText('Due Date');
  const add = screen.getByTestId('new-item-button');

  fireEvent.change(inputTask, {target: {value: content}});
  fireEvent.change(inputDate, {target: {value: formattedDate}});
  fireEvent.click(add);

  const cardColor = screen.getByTestId(content).style.background;

  expect(cardColor).toBe("indianred");
 });
