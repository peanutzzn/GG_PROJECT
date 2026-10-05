import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fontend';
    personForm: FormGroup;
  // วันที่ปัจจุบัน สำหรับกำหนด max ของวันเกิด
  maxBirthDate: string;
  persons: any[] = [];

  editingId: number | null = null;

  loading = false;
    constructor(private apiService: ApiService,
      private fb: FormBuilder
    ) {

    
    const today = new Date();

    this.maxBirthDate = today
      .toISOString()
      .split('T')[0];

    this.personForm = this.fb.group({

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        '',
        Validators.required
      ],

      birthDate: [
        '',
        Validators.required
      ],

      gender: [
        '',
        Validators.required
      ]

    });

  }


  ngOnInit(): void {

    this.loadPersons();

  }

  testBackend() {
    this.apiService.testBackend().subscribe({
      next: (res) => {
        console.log('Backend:', res);
      },
      error: (err) => {
        console.error('Backend error:', err);
      }
    });
  }

  testDatabase() {
    this.apiService.testDatabase().subscribe({
      next: (res) => {
        console.log('Database:', res);
      },
      error: (err) => {
        console.error('Database error:', err);
      }
    });
  }

  // submit(): void {

  //   if (this.personForm.invalid) {
  //     this.personForm.markAllAsTouched();
  //     return;
  //   }

  //   console.log(this.personForm.value);
  // }

  // ========================================
  // GET
  // ========================================

  loadPersons(): void {

    this.loading = true;

    this.apiService.getPersons()
      .subscribe({

        next: (res) => {

          this.persons = res.data;

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          alert('ไม่สามารถโหลดข้อมูลได้');

        }

      });

  }


  // ========================================
  // POST / PUT
  // ========================================

  submit(): void {

    if (this.personForm.invalid) {

      this.personForm.markAllAsTouched();

      return;

    }

    const data = this.personForm.value;


    // ================================
    // เพิ่ม
    // ================================

    if (this.editingId === null) {

      this.apiService
        .createPerson(data)
        .subscribe({

          next: (res) => {

            alert('เพิ่มข้อมูลสำเร็จ');

            this.resetForm();

            this.loadPersons();

          },

          error: (err) => {

            console.error(err);

            alert('ไม่สามารถเพิ่มข้อมูลได้');

          }

        });

    }


    // ================================
    // แก้ไข
    // ================================

    else {

      this.apiService
        .updatePerson(
          this.editingId,
          data
        )
        .subscribe({

          next: (res) => {

            alert('แก้ไขข้อมูลสำเร็จ');

            this.resetForm();

            this.loadPersons();

          },

          error: (err) => {

            console.error(err);

            alert('ไม่สามารถแก้ไขข้อมูลได้');

          }

        });

    }

  }


  // ========================================
  // Edit
  // ========================================

  editPerson(person: any): void {

    this.editingId = person.id;

    this.personForm.patchValue({

      firstName: person.first_name,

      lastName: person.last_name,

      birthDate: this.formatDate(person.birth_date),

      gender: person.gender

    });

  }


  // ========================================
  // Delete
  // ========================================

  deletePerson(id: number): void {

    const confirmDelete = confirm(
      'คุณต้องการลบข้อมูลนี้หรือไม่?'
    );

    if (!confirmDelete) {
      return;
    }

    this.apiService
      .deletePerson(id)
      .subscribe({

        next: (res) => {

          alert('ลบข้อมูลสำเร็จ');

          this.loadPersons();

        },

        error: (err) => {

          console.error(err);

          alert('ไม่สามารถลบข้อมูลได้');

        }

      });

  }


  // ========================================
  // Reset
  // ========================================

  resetForm(): void {

    this.personForm.reset();

    this.editingId = null;

  }


  // ========================================
  // Date
  // ========================================

  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    return date.substring(0, 10);

  }
}
