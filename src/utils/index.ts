import moment from "moment";

export const calculateAge = (dob: string): number => {
    if (!dob) return Number(dob); 
    return moment().diff(moment(dob, "YYYY-MM-DD"), "years");
};

export const calculateDobFromAge = (age: number): string => {
    const currentDate = moment();
    const dob = currentDate.subtract(age, 'years'); 
    return dob.format("YYYY-MM-DD"); 
};