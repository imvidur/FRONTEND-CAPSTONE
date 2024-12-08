// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../auth.service';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

//     const expectedRole = next.data['expectedRole'];
//     const token = this.authService.getToken();
  
//     if (token) {
//       const decoded: any = jwtDecode(token);
//       if (decoded.role === expectedRole) {
//         return true;
//       }
//     }
    
//     this.router.navigate(['/unauthorized']); // Redirect to unauthorized if role doesn't match
//     return false;
//     }
// }
