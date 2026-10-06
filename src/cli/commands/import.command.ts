import {ICommand} from './command.interface';
import {TSVFileReader} from '../libs/tsv-file-reader';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(err.message);
    }
  }
}
