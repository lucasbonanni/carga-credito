import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, AuthProvider } from '@firebase/auth-types';
import * as firebase from 'firebase/app';

// export class User {
//   name: string;
//   email: string;
//   password: string;

//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }
// }

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  user: User;
  access: boolean;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}

signInWithGithub() {
  console.log('Sign in with github');
  return this.oauthSignIn(new firebase.auth.GithubAuthProvider());
}

private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				alert(error.message);
			});
		});
	}
}
  // public login(credentials) {
  //   if (credentials.email === null || credentials.password === null) {
  //     return Observable.throw("Please insert credentials");
  //   }
  //   else {
  //     return Observable.create(observer => {
  //       // At this point make a request to your backend to make a real check!
  //       if (credentials.password === "pass" && credentials.email === "test@test.com") {
  //         this.access = true;
  //       }
  //       this.currentUser = new User('Lucas Bonanni', 'test@test.com');
  //       observer.next(this.access);
  //       observer.complete();
  //     });
  //   }
  // }

  // public register(credentials) {
  //   if (credentials.email === null || credentials.password === null) {
  //     return Observable.throw("Please insert credentials");
  //   } else {
  //     // At this point store the credentials to your backend!
  //     return Observable.create(observer => {
  //       this.currentUser.email = credentials.email;
  //       this.currentUser.name = 'lucas';
  //       this.currentUser.password = credentials.password;
  //       observer.next(true);
  //       observer.complete();
  //     });
  //   }
  // }

  public getUserInfo(): User {
    return this.user;
  }

//   public logout() {
//     return Observable.create(observer => {
//       this.currentUser = null;
//       observer.next(true);
//       observer.complete();
//     });
//   }
}
