export default class Characteristic {
  static get fields() {
    return {
      studentAttitudes: {
        attitudeToStudy: null,
        attitudeToElders: null,
        attitudeToFailures: null,
        relationshipWithPeers: null,
      },
      studentPersonality: {
        positiveSides: null,
        negativeSides: null,
        presenceOffenses: null,
      },
      hobbies: [],
      inclinations: [],
    };
  }
}
