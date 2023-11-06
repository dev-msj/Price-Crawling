export class BaseResponseDto {
  private code: number;
  private message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public get getCode(): number {
    return this.code;
  }

  public get getMessage(): string {
    return this.message;
  }
}
