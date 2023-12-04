class Day4
  def initialize
    @wins = []
  end

  private def input
    @_data ||= File.readlines("input.txt", chomp: true).map do |line|
      _, data = line.split ":"
      numbers_string, winning_string = data.split "|"

      [
        string_to_number_array(winning_string),
        string_to_number_array(numbers_string)
      ]
    end
  end

  private def string_to_number_array(string)
    string.split(" ").map(&:to_i)
  end

  private def card_matches(winning, numbers)
    numbers.intersection(winning).length
  end

  private def card_score(matches)
    matches == 0 ? 0 : 2 ** (matches - 1)
  end

  def part1
    input.map { |winning, numbers|
      card_score(card_matches(winning, numbers))
    }.sum
  end

  private def play(index, depth)
    return @wins[index] if @wins[index]

    game = input[index]
    matches = card_matches(*game)

    return 1 if matches == 0

    @wins[index] = (1..matches).map { |offset|
      play(index+offset, depth+1)
    }.sum + 1
  end

  def part2
    input.each_with_index.map { |_, index|
      play(index, 0)
    }.sum
  end
end

day4 = Day4.new
p day4.part1
p day4.part2
