import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComp from './searchComp.js';

const App = () => {
    const [articles, setArcticles] = useState([]);
    const [searchVal, setSearch] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getArticles = () => {
            let params = 'q=' + searchVal + '&api-key=ObVHtMHb2ixnb8jSkUbetUz4KQl0eq7d'
            axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + params)
                .then(function (result) {
                    if (result.status == 200) {
                        let resData = result.data.response.docs;
                        if (resData != undefined) {
                            setArcticles(resData);
                            setLoading(false)
                        }
                    }
                }).catch(function (e) {
                    console.log(e)
                });
        }
        getArticles();
    }, [searchVal])


    return (
        < div >
            <div className="main_container">
                <div className="inner">
                    {searchVal != "" ? <h1 className="view_txt">Now you are viewing about {searchVal}</h1> : ""}
                    <SearchComp serVal={(searchVal) => setSearch(searchVal)} loader={(isLoading) => setLoading(isLoading)} />
                </div>
            </div>
            {isLoading ? <div className="load_txt"> Loading articles ...</div> :
                <section className="section_main" > {
                    articles.map((obj) => {
                        const {
                    abstract,
                            lead_paragraph,
                            headline: { main },
                            byline: { original },
                            news_desk,
                            section_name,
                            _id,
                            web_url
                } = obj;
                        return (
                            <article className="bg-white test" key={_id} >
                                <h2> {main} </h2>
                                <h4> {abstract} </h4> <p > {lead_paragraph} < /p >
                        <a href={web_url} target="_blank" title="click here"> View page source </a>
                                    <ul>
                                        <li>{original}</li>
                                        <li>{news_desk}</li>
                                        <li>{section_name}</li>
                                    </ul>
                                    < /article >

                                        )
            })
        }
        </section> }
     </div >
                        );
                    }

export default App;
