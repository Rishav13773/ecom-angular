import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  id: any;
  addressId?: number;
  fullName: string;
  mobileNumber: string;
  pincode: string;
  flatHouseNo: string;
  areaStreet: string;
  landmark?: string;
  townCity: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:5053/api/addresses'; // Update the URL if needed

  constructor(private http: HttpClient) {}

  // 🔹 Get all addresses
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/GetAllAdresses`);
  }

  // 🔹 Get address by ID
  getAddressById(): Observable<Address> {
    const userToken = localStorage.getItem('UserToken');

    if (!userToken) {
      console.error('User not logged in.');
      return new Observable(); // Prevent API call if userToken is missing
    }

    let parsedToken;
    try {
      parsedToken = JSON.parse(userToken);
    } catch (error) {
      console.error('Invalid token format:', error);
      return new Observable();
    }

    const userId = parsedToken?.userId;

    if (!userId || typeof userId !== 'number') {
      console.error('Invalid User ID:', userId);
      return new Observable();
    }
    return this.http.get<Address>(`${this.apiUrl}/GetAddressById/${userId}`);
  }

  // 🔹 Add new address
  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/AddAddress`, address);
  }

  // 🔹 Update an existing address
  updateAddressById(id: number, address: Address): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateAddressById/${id}`, address);
  }

  // 🔹 Delete an address
  deleteAddressById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteAddressById/${id}`);
  }
}
