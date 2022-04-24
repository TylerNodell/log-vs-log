import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useState, useEffect, ReactChild, ReactFragment, ReactPortal} from "react";

export async function getStaticProps() {
    const {data} = await client.query({
        query: gql`
            query ($code: String!, $startTime: Float!, $endTime: Float!) {
                reportData {
                    report(code: $code){
                        code
                        fights(killType: Kills) {
                            id
                            encounterID
                            startTime
                            endTime
                            kill
                            maps {
                                id
                            }
                        }
                        events(
                            startTime: $startTime,
                            endTime: $endTime,
                            dataType: Casts,
                            useAbilityIDs: false,
                            useActorIDs: false,
                            sourceID: 6
                        ) {
                            data
                        }
                    }
                }
            }
        `,
        variables: {
            code: "nqcTBMzW1aDPtyGp",
            startTime: 7413182,
            endTime: 7823821,
        },
    });

    let fights = data.reportData.report.fights;
    let casts = data.reportData.report.events.data;

    return {
        props: {
            fights,
            casts,
        },
    };
}

export default function Log({fights, casts}) {
    const fight = fights[0];
    const abilities = casts;

    const fightInstance = () => {
        switch (fight.encounterID) {
            case 78:
                return "Asphodelos: The First Circle (Savage)";
            case 79:
                return "Asphodelos: The Second Circle (Savage)";
            case 80:
                return "Asphodelos: The Third Circle (Savage)";
            case 81:
                return "Asphodelos: The Fourth Circle (Savage)";
            case 82:
                return "Asphodelos: The Fourth Circle (Savage) - Phase 2";

        }
    }

    useEffect(() => {
    }, []);

    return (
        <div className="grid h-screen w-full grid-cols-1 bg-slate-200 md:grid-cols-1 bg-gradient-to-r from-zinc-400 to-slate-400 justify-items-center gap-2">
            <div className="bg-slate-200 w-8/12 h-fit text-center mt-4 rounded-lg py-2 drop-shadow-xl">
                <h2 className="font-sans prose-h2 prose-2xl font-bold">{fightInstance()}</h2>
            </div>
            <div className="bg-slate-200 w-10/12 h-fit text-center mt-4 rounded-lg py-2 drop-shadow-xl">
                <ul>
                    {abilities.map((ability, index) => {
                        if (ability.type === "cast") {
                            return (
                                <li key={index}>
                                    <p className="font-sans prose-h3 prose-2xl font-bold">{ability.ability.name}</p>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            {/* <ul>
                {abilities.map((ability) => {
                    return (
                        <li>
                            {ability.ability.name}
                        </li>
                    );
                })}
            </ul> */}
        </div>
    );
}