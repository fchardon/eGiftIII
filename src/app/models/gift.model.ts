export class GiftModel {
  id: number;
  uid: number;
  name: string;
  description: string;
  url: string;
  status: string;

  isReserve(): boolean{
    return status === 'RESERVE';
  }

  isAchete(): boolean{
    return status === 'ACHETE';
  }

  isDisponible(): boolean{
    return status === 'DISPONIBLE';
  }

}
