export async function transform<TJson, TResult>(
    data: TJson,
    supplier: (json: TJson) => TResult
): Promise<TResult> {
    return supplier(data);
}