import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailAction({errors: errorResponse.error.errors}));
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    {dispatch: false},
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}
}
