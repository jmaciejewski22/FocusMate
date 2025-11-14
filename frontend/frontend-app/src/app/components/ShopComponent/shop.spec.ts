import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { ShopService } from '../../../shop.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockItems = [
  { id: '1', name: 'Sword', cost: 50 },
  { id: '2', name: 'Shield', cost: 75 },
];

class MockShopService {
  getItems = jest.fn(() => of(mockItems));
}

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let shopService: MockShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ShopService, useClass: MockShopService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService) as any;

    fixture.detectChanges();
  });

  // -------------------------------------------------------
  // 1. Component creation
  // -------------------------------------------------------
  it('should create the ShopComponent', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------
  // 2. Items load into the component
  // -------------------------------------------------------
  it('should load items from ShopService on init', () => {
    expect(shopService.getItems).toHaveBeenCalled();
    expect(component.items.length).toBe(2);
  });

  // -------------------------------------------------------
  // 3. Items render in the template
  // -------------------------------------------------------
  it('should render item names in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const text = compiled.textContent || '';

    expect(text).toContain('Sword');
    expect(text).toContain('Shield');
  });
});

