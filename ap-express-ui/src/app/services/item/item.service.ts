import {Injectable} from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public httpClient: HttpClient) {
  }

  /**
   * Creates an item with the given details.
   * @param item The item details to create.
   */
  createItem(item: any) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/item/create_item',
      item,
      {observe: 'response'}
    );
  }

  /**
   * Updates the details of an existing item.
   * @param item The item details to update.
   */
  updateItem(item: any) {
    return this.httpClient.put<any>(
      AppConstant.BASE_URL + '/item/update_item',
      item,
      {observe: 'response'}
    );
  }

  /**
   * Retrieves the details of an item with the given ID.
   * @param itemId The ID of the item to retrieve.
   */
  getItem(itemId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/item/get_item_detail_by_id',
      {observe: 'response', params: {itemId}, withCredentials: true}
    );
  }

  /**
   * Deletes the item with the given ID.
   * @param itemId The ID of the item to delete.
   */
  deleteItem(itemId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/item/delete_item_detail_by_id',
      {observe: 'response', params: {itemId}}
    );
  }

  // Search table related services
  /**
   * Retrieves a list of all items.
   */
  getAllItemList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/item/getAll',
      {observe: 'response'}
    );
  }

  /**
   * Retrieves the settings for the item table.
   */
  getSetting() {
    return this.httpClient.get('/assets/table_json/item_setting.json', {
      observe: 'response',
    });
  }

  /**
   * this method can be used to get category list
   */
  getCategoryList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/item/get_category_list',
      {observe: 'response'})
  }

  /**
   * this method can be used to get uom list
   */
  getUOMList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/item/get_uom_list',
      {observe: 'response'})
  }

  /**
   * get item name by item id
   * @param itemId The ID of the item to retrieve.
   */
  getItemNameById(itemId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/item/get_name_by_id',
      {observe: 'response', params: {itemId}, withCredentials: true}
    );
  }
}
