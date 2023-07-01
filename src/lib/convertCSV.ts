import { readFileSync, writeFileSync } from "fs";
import { parse, unparse } from "papaparse";

const startingCsvFile = "starting.csv";
const endingCsvFile = "ending.csv";
// FOrmat for converting quickbooks to stripe revanue recognition
interface StartingRow {
  Date: string;
  Bank: string;
  Account: string;
  Description: string;
  Amount: string;
  Type: string;
  Category: string;
  Receipt: string;
  Notes: string;
}

interface EndingRow {
  source: string;
  transaction_id: string;
  split_transaction_id: string;
  booked_date: string;
  recognition_start_date: string;
  recognition_end_date: string;
  amount: string;
  currency: string;
  description: string;
}

const convertCsv = (startingCsvFile: string, endingCsvFile: string): void => {
  const startingData = readFileSync(startingCsvFile, "utf8");
  const csvData: Array<StartingRow> = parse(startingData, {
    header: true,
  }).data;

  const endingData: EndingRow[] = csvData.map((row) => {
    const Date = new Date(row.Date);
    const booked_date = `${Date.getFullYear()}-${(
      "0" +
      (Date.getMonth() + 1)
    ).slice(-2)}-${("0" + Date.getDate()).slice(-2)}`;

    const endingRow: EndingRow = {
      source: "Mercury",
      transaction_id: "",
      split_transaction_id: "",
      booked_date,
      recognition_start_date: "",
      recognition_end_date: "",
      amount: row.Amount,
      currency: "USD",
      description: row.Description,
    };
    return endingRow;
  });

  const endingCSV = unparse(endingData);
  writeFileSync(endingCsvFile, endingCSV);
};

convertCsv(startingCsvFile, endingCsvFile);
