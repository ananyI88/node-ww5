export interface movie{
    mid:        number;
    name:       string;
    rate:       number;
    time:       number;
    detail:     string;
    release:    number;
    type:       string;
}
export interface person{
    // pid:        number;
    name:       string;
    birthdate:  string;
    detail:     string;
    rank:       number;
}
export interface star {
    mid:        number,
    name:       string;
    birthdate:  string;
    detail:     string;
    rank:       number;
  }
  export interface creator {
    mid:        number,
    name:       string;
    birthdate:  string;
    detail:     string;
    rank:       number;
  }
// export interface creator{
//     cid:    number;
//     pid:    number;
//     mid:    number;
// }
// export interface star{
//     sid:	number;
//     pid:	number;
//     mid:    number;	
// }