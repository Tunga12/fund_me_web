import { Fundraiser } from "src/app/models/fundraiser.model";
import { Report } from "src/app/models/report.model";

export interface ReportedFundraiser{
    fundraiser:Fundraiser;
    report:Report;
}