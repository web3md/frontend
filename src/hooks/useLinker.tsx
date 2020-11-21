import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const useLinker = (path: string, target?: string) => {
    const history = useHistory();
    return useCallback(() => {
        if (target) {
            window.open(path, target);
        } else {
            history.push(path);
        }
    }, [path, target]);
};

export default useLinker;
