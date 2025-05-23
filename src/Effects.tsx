import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<number>(-1);

    // Обработчик новых сообщений
    const handleNewMessage = (message: number) => {
        setLastMessage(message);
    };

    useEffect(() => {
        // При изменении источника сбрасываем последнее сообщение
        setLastMessage(-1);

        // Подписываемся на новые сообщения для текущего источника
        subscribe(props.sourceId, handleNewMessage);

        // Функция очистки - отписываемся при размонтировании или изменении источника
        return () => {
            unsubscribe(props.sourceId, handleNewMessage);
        };
    }, [props.sourceId]); // Эффект срабатывает при изменении sourceId

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}
