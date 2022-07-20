import React, { useEffect, useState } from 'react';
import styles from './QuoteList.module.css'

const QuoteList = () => {
    const [quotes, setQuotes] = useState([])
    const quotesLength = 4;

    const getQuoteData = async (id) => {
        const response = await fetch(`https://indie-hackers.firebaseio.com/loadingQuotes/${id}.json`)
            .then(res => res.json())

        console.log(typeof response)
            
        setQuotes(oldQuotes => [...new Set([...oldQuotes, response])])
    }

    useEffect(() => {
        for(let i = 0; i < quotesLength; i++) {
            getQuoteData(i)
        }
    }, [])

    const quoteItems = quotes.map((quoteItem, index) =>
        <a key={ index } href={ quoteItem.url } target="_blank">
            <div>
                "{ quoteItem.quote }"
            </div>
        </a>
    );

    return (
        <>
            <h1>Indie Hackers Quotes</h1>
            <div className={ styles.quotesContainer }>
                { quoteItems }
            </div>
        </>
    )
}

export default QuoteList;