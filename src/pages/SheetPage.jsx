import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Staff from '../components/music/Staff';
import sheetsService from '../services/sheets.service';

function SheetPage ({}) {
    const [sheet, setSheet] = useState(null);
    const { id } = useParams();

    const measures = [0, 1, 2, 3];
    const staffs = [1, 2, 3, 4, 5, 6, 7, 8];
    
    console.log(id);

    const getSheet = () => {
        sheetsService.getSheet(id)
        .then(result => { setSheet(result.data); })
        .catch(error => console.log(error));
    }
    
    const updateSheet = (payload) => {
        payload.id = id;
        sheetsService.updateSheet(payload)
        .then(result => setSheet(result.data))
        .catch(error => console.log(error));
    }   

    useEffect(() => {
        getSheet();
    }, [])

    if (!sheet) {
        return (
            <section id="center">
                <span className="loading loading-spinner loading-xl"></span>
            </section>
        )
    }

    return (
        <>
            <section id="center">
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="input"
                    value={sheet.title}
                    onChange={}
                />

                <svg height="200vh" width="80%" xmlns="http://www.w3.org/2000/svg">
                    {/* <Staff notes={["a,", "a#2,", "b4,", "c8", "c#16", "d4", "d#4", "e4", "f4", "f#4",
                    "g4", "g#4", "a4", "a#4", "b4", "cn4'", "b4", "bb4", "a4", "ab4", "g4", "gb4", "f4",
                    "e4", "eb4", "d4", "db4", "c4"
                    ]} /> */}

                    { 
                        staffs.map((staff) => (
                            <Staff 
                                key={staff}
                                offset={staff * 150}
                                notes={[
                                    "g2", "f8", "g8", "f8", "e8",
                                    "g2", "f2",
                                    "g2", "f8", "g8", "f8", "e8",
                                    "g#4", "b4", "g4", "fn4", "e4",
                                    "a2", "gn8", "a8", "g8", "e8"
                                ]} 
                            />
                        ))
                    }
                </svg>
            </section>
        </>
    )
}

export default SheetPage;