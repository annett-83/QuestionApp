import { shallowEqual } from "shallow-equal";
export const handleSingleObject = (stateObject, payloadObject) => {
    Object.keys(stateObject).forEach((key) => {
        if (!payloadObject[key]) {
            delete stateObject[key];
        }
    });
    Object.keys(payloadObject).forEach((key) => {
        if (key !== "_id" && payloadObject[key] && stateObject[key] !== payloadObject[key]) {
            stateObject[key] = payloadObject[key];
        }
    });
};
export const handleObjectArrays = (state_data, action_payload) => {
    try {
        action_payload.map((payloadObject) => {
            const stateObject = state_data.find(
                (s) => s._id === payloadObject._id
            );
            if (stateObject) {
                if (!shallowEqual(stateObject, payloadObject)) {
                    handleSingleObject(stateObject, payloadObject);
                }
            } else {
                state_data.push(payloadObject);
            }
        });
        const removeList = [];
        // find unused
        for (let i = state_data.length - 1; i >= 0; i--) {
            const f = action_payload.find((p) => state_data[i]._id === p._id);
            if (!f) {
                removeList.push(i);
            }
        }
        removeList.map((r) => {
            state_data.splice(r, 1);
        });
    } catch (e) {
        console.log(e, action_payload);
    }
};
