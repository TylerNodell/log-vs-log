import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useState, useEffect } from "react";

export async function getStaticProps() {
  const { data } = await client.query({
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
  let code = data.reportData.report.code;
  let casts = data.reportData.report.events.data;

  return {
    props: {
      fights,
      casts,
    },
  };
}

export default function Log( { fights, casts } ) {

    const [encounter, setEncounter] = useState(fights[0]);
    const [abilities, setAbilities] = useState(casts);

    useEffect(() => {
    }, []);

    return <div>Log</div>;
}