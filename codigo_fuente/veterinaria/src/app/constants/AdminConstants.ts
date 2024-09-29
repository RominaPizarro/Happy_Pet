export class AdminConstants {
  public static defaultItemPerPage = 10;

  public static defaultFIleSize = 10 * 1024 * 1000;

  public static fileConfig = {
    default: {
      tipoArchivos: 'pdf,.pdf',
      tamanoArchivo: this.defaultFIleSize,
      tamanoArchivosText: '10MB',
    },
  };

}
