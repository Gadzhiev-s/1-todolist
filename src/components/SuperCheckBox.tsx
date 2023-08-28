import React, {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox";

type SuperCheckBoxType = {
    callBack: (e:ChangeEvent<HTMLInputElement>) => void,
    isDone: boolean,
}

export const SuperCheckBox = (props: SuperCheckBoxType) => {

return (
    <Checkbox
        onChange={props.callBack}
        checked={props.isDone}
      />
)
}