import Rebase from 're-base';
import firebase from 'firebase';

var config = {
	apiKey: 'AIzaSyDt2ufPLfgvIRdr3gYLYVcL0L6x3V07i6w',
	authDomain: 'jeopardy-77dae.firebaseapp.com',
	databaseURL: 'https://jeopardy-77dae.firebaseio.com'
};
firebase.initializeApp(config);

export default firebase;
