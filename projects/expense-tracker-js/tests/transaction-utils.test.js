import test from "node:test";
import assert from "node:assert/strict";
import { calculateSummary, filterTransactions, validateTransaction } from "../js/transaction-utils.js";

const transactions = [
  { id:"1",type:"income",description:"Salary",amount:2000,category:"Salary",date:"2026-07-01",createdAt:"2026-07-01T00:00:00Z" },
  { id:"2",type:"expense",description:"Train pass",amount:120,category:"Transport",date:"2026-07-03",createdAt:"2026-07-03T00:00:00Z" },
];

test("calculates income, expenses, balance, and record count", () => {
  assert.deepEqual(calculateSummary(transactions), { income:2000,expenses:120,balance:1880,count:2 });
});

test("filters by text, type, and category", () => {
  assert.equal(filterTransactions(transactions,{search:"train",type:"expense",category:"Transport"}).length,1);
  assert.equal(filterTransactions(transactions,{search:"missing",type:"all",category:"all"}).length,0);
});

test("validates required and numeric transaction values", () => {
  assert.deepEqual(Object.keys(validateTransaction({type:"expense",description:"",amount:"0",category:"",date:""})).sort(),["amount","category","date","description"]);
  assert.deepEqual(validateTransaction({type:"income",description:"Consulting",amount:"250",category:"Freelance",date:"2026-07-22"}),{});
});
