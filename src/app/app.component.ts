import { afterNextRender, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { PageLoadingBarComponent } from '@elementar-rt/components/page-loading-bar';
import {
  AnalyticsService, EnvironmentService,
  SeoService, SoundEffectDirective,
  ThemeManagerService
} from '@elementar-rt/components/core';
import { AnnouncementGlobalComponent } from '@elementar-rt/components/announcement';
import { IncidentsContainerComponent } from '@elementar-rt/components/incidents';
import {
  LayoutBodyComponent,
  LayoutComponent,
  LayoutSidebarComponent, LayoutTopbarComponent
} from '@elementar-rt/components/layout';
import { SidebarComponent } from '@app/sidebar/sidebar.component';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LogoComponent, TextLogoComponent } from '@elementar-rt/components/logo';
import { SplashScreenComponent } from '@elementar-rt/components/splash-screen';
import {
  ColorScheme,
  ColorSchemeDarkDirective,
  ColorSchemeLightDirective,
  ColorSchemeSwitcherComponent,
} from '@elementar-rt/components/color-scheme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PageLoadingBarComponent,
    AnnouncementGlobalComponent,
    IncidentsContainerComponent,
    LayoutBodyComponent,
    LayoutComponent,
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    SidebarComponent,
    MatIcon,
    MatAnchor,
    MatTooltip,
    RouterLink,
    LogoComponent,
    SplashScreenComponent,
    TextLogoComponent,
    ColorSchemeSwitcherComponent,
    ColorSchemeLightDirective,
    ColorSchemeDarkDirective,
    SoundEffectDirective,
    MatButton,
    MatIconButton,
    CdkTrapFocus,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _analyticsService = inject(AnalyticsService);
  private _seoService = inject(SeoService);
  private _envService = inject(EnvironmentService);
  private _router = inject(Router);

  /**
   * Off-canvas navigation drawer, only reachable below the `md` breakpoint.
   * Starts closed so the server and the client render the same markup.
   */
  readonly mobileNavOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      // Scroll a page to top if url changed
      this._router.events
        .pipe(
          filter(event=> event instanceof NavigationEnd)
        )
        .subscribe(() => {
          this.closeMobileNav();
          window.scrollTo({
            top: 0,
            left: 0
          });
        })
      ;

      // Growing past `md` puts the sidebar back in the page flow, so a drawer
      // left open would otherwise re-appear on the way back down.
      const desktop = window.matchMedia('(width >= 48rem)');
      desktop.addEventListener('change', event => {
        if (event.matches) {
          this.closeMobileNav();
        }
      });
    });
  }

  @HostListener('document:keydown.escape')
  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update(open => !open);
  }

  ngOnInit(): void {
    this._seoService.trackCanonicalChanges(this._envService.getValue('siteUrl'));
    this._analyticsService.trackPageViews();
  }

  onColorSchemeChanged(colorScheme: ColorScheme) {
    console.log('color scheme: ', colorScheme);
    // save this color to backend
  }
}
