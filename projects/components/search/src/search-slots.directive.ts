import { Directive } from '@angular/core';

/** Leading content of the closed search bar, e.g. a menu button or search icon. */
@Directive({
  selector: '[emrSearchLeading]',
  host: {
    'class': 'emr-search-leading'
  }
})
export class SearchLeadingDirective {
}

/** Trailing content of the closed search bar, e.g. a voice button or avatar. */
@Directive({
  selector: '[emrSearchTrailing]',
  host: {
    'class': 'emr-search-trailing'
  }
})
export class SearchTrailingDirective {
}

/** Leading icon, avatar or image of a search result item. */
@Directive({
  selector: '[emrSearchItemLeading]',
  host: {
    'class': 'emr-search-item-leading'
  }
})
export class SearchItemLeadingDirective {
}

/** Supporting text shown below the headline of a search result item. */
@Directive({
  selector: '[emrSearchItemSupporting]',
  host: {
    'class': 'emr-search-item-supporting'
  }
})
export class SearchItemSupportingDirective {
}

/** Trailing content of a search result item, e.g. an icon or metadata. */
@Directive({
  selector: '[emrSearchItemTrailing]',
  host: {
    'class': 'emr-search-item-trailing'
  }
})
export class SearchItemTrailingDirective {
}
