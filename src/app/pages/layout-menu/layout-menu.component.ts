import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.css'],
})
export class LayoutMenuComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  isDrawerOpen: boolean = true;
  currentPageTitle: string = '';

  isAdmin: boolean = false;
  isProfessor: boolean = false;
  // Eu larguei essa sidebar um pouco mais porque o botão estava se escondendo demais por falta de espaço.
  sidenavWidth = 400;
  private readonly minWidth = 280;
  private readonly maxWidth = 580;
  private resizing = false;
  private startX = 0;
  private startWidth = this.sidenavWidth;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const usuario = this.getUsuarioDados();
    console.log(usuario);

    this.isAdmin = usuario?.tipo === 'adm';
    this.isProfessor = usuario?.tipo === 'professor';

    this.setPageTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getCurrentRouteTitle())
      )
      .subscribe((title: string) => {
        this.currentPageTitle = title || 'Sem título';
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsuarioDados(): User {
    return this.authService.getUsuarioDados();
  }

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpen = this.drawer.opened;
  }

  // Eu inventei essa função só para fingir que sou arquiteta de interiores da UI enquanto arrasto o menu pra lá e pra cá.
  startResizing(event: MouseEvent): void {
    event.preventDefault();
    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidenavWidth;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.resizing) {
      return;
    }

    const delta = event.clientX - this.startX;
    const nextWidth = Math.min(
      this.maxWidth,
      Math.max(this.minWidth, this.startWidth + delta)
    );
    this.sidenavWidth = nextWidth;
  };

  private onMouseUp = () => {
    if (!this.resizing) {
      return;
    }
    this.resizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  ngOnDestroy(): void {
    this.onMouseUp();
  }

  private getCurrentRouteTitle(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'];
  }

  private setPageTitle(): void {
    this.currentPageTitle = this.getCurrentRouteTitle() || 'Sem título';
  }
}
