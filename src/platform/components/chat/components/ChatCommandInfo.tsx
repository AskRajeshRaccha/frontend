import * as React from "react";
import {getMatchingCommands} from "../../../modules/chat/commands";

const Style = require("./ChatCommandInfo.scss");

type Props = {
    message: string;
};

class ChatCommandInfo extends React.Component<Props> {
    render() {
        const {message} = this.props;

        const matchingCommands = getMatchingCommands(message);
        if (message.length === 0 || matchingCommands.length === 0) {
            return null;
        }

        return (
            <div className={Style.chatCommandInfo}>
                {matchingCommands.map(x => (
                    <div className={Style.command}>
                        <span>
                            {x.name} {x.params}
                        </span>
                        <span>{x.description}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default ChatCommandInfo;