defmodule Day3 do
  def input do
    File.stream!("input.txt")
    |> Enum.map(&String.trim/1)
  end

  defp number?(input) do
    String.match?(input, ~r/\d/)
  end

  defp symbol?(".") do
    false
  end

  defp symbol?(input) do
    !number?(input)
  end

  defp adjacent?(lines, index, length) do
    lines
    |> Enum.any?(fn line -> contains?(line, index, length) end)
  end

  defp contains?(line, index, length) do
    line
    |> substring(index - 1, length + 1)
    |> String.split("", trim: true)
    |> Enum.any?(&symbol?/1)
  end

  defp substring(line, index, length) do
    line
    |> String.slice(Range.new(max(0, index), index + length))
  end

  defp number_boundaries(line) do
    Regex.scan(~r/\d+/, line, return: :index)
    |> List.flatten()
    |> Enum.map(fn {index, length} ->
      {index, length, String.to_integer(substring(line, index, length - 1))}
    end)
  end

  def part1(lines, prev \\ "")

  def part1([], _) do
    0
  end

  def part1([head | rest], prev) do
    next =
      case rest do
        [next | _] -> next
        _ -> ""
      end

    total =
      number_boundaries(head)
      |> Enum.map(fn {index, length, number} ->
        cond do
          adjacent?([prev, head, next], index, length) -> number
          true -> 0
        end
      end)
      |> Enum.sum()

    total + part1(rest, head)
  end

  def part2(lines, prev \\ "")

  def part2([], _) do
    0
  end

  def part2([head | rest], prev) do
    next =
      case rest do
        [next | _] -> next
        _ -> ""
      end

    total =
      Regex.scan(~r/\*/, head, return: :index)
      |> List.flatten()
      |> Enum.map(fn {index, _} ->
        [prev, head, next]
        |> Enum.map(&number_boundaries/1)
        |> List.flatten()
        |> Enum.reduce([], fn {start, length, number}, acc ->
          if index >= start - 1 and index < start + length + 1 do
            [number | acc]
          else
            acc
          end
        end)
      end)
      |> Enum.map(fn values ->
        case length(values) do
          2 -> Enum.product(values)
          _ -> 0
        end
      end)
      |> Enum.sum()

    total + part2(rest, head)
  end
end

Day3.input()
|> Day3.part1()
|> IO.inspect()

Day3.input()
|> Day3.part2()
|> IO.inspect()
