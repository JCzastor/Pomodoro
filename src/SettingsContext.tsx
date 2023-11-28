import React from "react";

type SettingsContextType = {
    workMinutes: number;
    //breakMinutes: number;
    setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
    //setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
}

const [workMinutes, setWorkMinutes] = React.useState(0);
const [breakMinutes, setBreakMinutes] = React.useState(0);

const SettingsContext = React.createContext<null | SettingsContextType>;

export default SettingsContext;