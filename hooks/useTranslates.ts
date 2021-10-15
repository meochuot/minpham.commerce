import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
export function useTranslates(ids: string[], params?: any[]) {   
    const [messages, setMessages] = useState<string[]>([])
    const intl = useIntl();
    const { locale } = useRouter()
    const translate = () => {
        let arr :string[] = [];
        for(let i = 0; i < ids.length; i++) {
            let values = params && params[i] ? params[i] : null;
            let msg = intl.formatMessage({id: ids[i]},{values: values})
            arr.push(msg)
        }
        setMessages(arr)
    }

    useEffect( () => {
        translate()
    },[ids, params, locale]);

    return messages;
}