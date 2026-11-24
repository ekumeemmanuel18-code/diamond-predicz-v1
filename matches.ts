export type DemoMatch = {
  id: string; competition: string; region: string; kickoff: string;
  status: string; home: string; away: string; homeGoals: number; awayGoals: number;
};

/**
 * UI-only illustrative fixtures. Never treat these as real scheduled matches.
 * Replace this module with a server-side provider backed by your licensed API.
 */
export const demoMatches: DemoMatch[] = [
  {id:"demo-1",competition:"Premier League · DEMO",region:"England",kickoff:"15:00",status:"Illustrative",home:"Northbridge FC",away:"Riverside United",homeGoals:1.65,awayGoals:1.05},
  {id:"demo-2",competition:"Continental Cup · DEMO",region:"Europe",kickoff:"18:30",status:"Illustrative",home:"Royal Athletic",away:"Metro City",homeGoals:1.35,awayGoals:1.42},
  {id:"demo-3",competition:"National League · DEMO",region:"Africa",kickoff:"20:00",status:"Illustrative",home:"Coastal Stars",away:"Highland Rovers",homeGoals:1.8,awayGoals:0.82},
  {id:"demo-4",competition:"Championship · DEMO",region:"Asia",kickoff:"Tomorrow",status:"Illustrative",home:"Eastern Wanderers",away:"Capital Sporting",homeGoals:1.22,awayGoals:1.18}
];
