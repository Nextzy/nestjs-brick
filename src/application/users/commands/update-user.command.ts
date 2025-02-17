export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly password?: string,
  ) {}
}
