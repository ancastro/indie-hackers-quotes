import React, { useEffect, useState } from 'react';
import styles from './QuoteList.module.css'

const QuoteList = () => {
    const [quotes, setQuotes] = useState({})
    const quotesLength = 4;

    const getQuoteData = async (id) => {
        const response = await fetch(`https://indie-hackers.firebaseio.com/loadingQuotes/${id}.json`)
            .then(res => res.json())

        const quoteData = {};
        quoteData[id] = response;

        setQuotes(prevState => { return {...prevState, ...quoteData}})
    }

    useEffect(() => {
        for(let i = 0; i < quotesLength; i++) {
            getQuoteData(i)
        }
    }, [])

    const quoteItems = Object.keys(quotes).map((key) =>
        <>
            <a key={ key } href={ quotes[key].url } target="_blank">
                <div>
                    "{ quotes[key].quote }" <span className={ styles.author }>- { quotes[key].byline }</span>
                </div>
            </a>
            <hr />
        </>
    );

    return (
        <>
            <h1>Indie Hackers Quotes</h1>
            <div className={ styles.quotesContainer }>
                { quoteItems }
                <div className={ styles.paginationButtons }>
                    <span onClick={ () => alert("back")}>⬅️</span> 
                    <span  onClick={ () => alert("next")}>➡️</span>
                </div>
            </div>
        </>
    )
}

export default QuoteList;